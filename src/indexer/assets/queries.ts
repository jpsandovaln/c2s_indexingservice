import gql from 'graphql-tag';
import { ApolloServerClient } from '../client/apollo.client';

const GET_ALL_ASSETS = gql`
  query {
    allRooms {
      _id: asset_id
      _tenantName
      description
      type
      name
      state
      capacity
    }
  }
`;

const GET_ASSETS_BY_ID = gql`
  query PersonalInvitationById($id: String!) {
    personalInvitationById(id: $id) {
      _id
    }
  }
`;

export async function getAssetById(assetId: string) {
  const apolloClient = new ApolloServerClient();
  const { data } = await apolloClient.getClient().query({
    query: GET_ASSETS_BY_ID,
    variables: { id: assetId },
  });
  return data.personalInvitationById;
}

export async function getAllAssets() {
  const apolloClient = new ApolloServerClient();
  const { data } = await apolloClient.getClient().query({
    query: GET_ALL_ASSETS
  });
  return data.allRooms;
}
