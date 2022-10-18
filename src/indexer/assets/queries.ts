import gql from 'graphql-tag';
import { ApolloServerClient } from '../client/apollo.client';

const GET_ALL_ASSETS = gql`
  query {
    assets {
      assetID
      previewURL
      preview(renditionID: "5") {
        binaryID
        fileName
        fileSize
        fileType
      }
    }
  }
`;

const GET_ASSETS_BY_ID = gql`
  query assetById($assetID: String!) {
    assetById(assetID: $assetID) {
      assetID
      previewURL
      preview(renditionID: "5") {
        binaryID
        fileName
        fileSize
        fileType
      }
    }
  }
`;

export async function getAssetById(assetID: string) {
  const apolloClient = new ApolloServerClient();
  const { data } = await apolloClient.getClient().query({
    query: GET_ASSETS_BY_ID,
    variables: { assetID },
  });
  return data.assetById;
}

export async function getAllAssets() {
  const apolloClient = new ApolloServerClient();
  const { data } = await apolloClient.getClient().query({
    query: GET_ALL_ASSETS,
  });
  return data.assets;
}
