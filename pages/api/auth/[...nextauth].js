import NextAuth from 'next-auth';
import { compare, hash } from 'bcrypt';
import { GraphQLClient, gql } from 'graphql-request';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';


export default NextAuth({
  providers: [
    /**AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }), */
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      synchronize: false,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      jwt: {
        encryption: true,
      },
      secret: process.env.secret,
      callbacks: {
        async jwt(token, account) {
          if (account?.accessToken) {
            token.accessToken = account.accessToken
          }
          return token
        },
      },
      secret: process.env.JWT_SECRET,
    }),
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@tmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      secret: process.env.JWT_SECRET,

      authorize: async ({ email, password }) => {
        const { user } = await client.request(GetUserByEmail, {
          email,
        })

        if (!user) {
          const { newUser } = await client.request(CreateNextUserByEmail, {
            email,
            password: await hash(password, 12),
          })

          return {
            id: newUser.id,
            username: email,
            email,
          }
        }

        const isValid = await compare(password, user.password)

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.')
        }

        return {
          id: user.id,
          username: email,
          email,
          name,
        }
      },
    }),
  ],

  /* too much of these makes stalled requests
  pages: {
    //signIn: '/auth/signin',
    //signOut: '/auth/signout',
    //error: '/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },*/

  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '#cd853f', // Hex color code
    logo: ' ', // Absolute URL to image
  },
  secret: process.env.JWT_SECRET,
});

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;
