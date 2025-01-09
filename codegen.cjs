module.exports = {
  // schema: 'http://localhost:8080/v1/graphql',
  // schema: 'https://daomasons-e188121.dedicated.hyperindex.xyz/v1/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
};
