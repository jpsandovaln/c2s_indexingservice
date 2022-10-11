import gql from 'graphql-tag';

export const GET_ALL_ASSETS = gql`
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

export const GET_ASSETS_BY_ID = gql`
  query PersonalInvitationById($id: String!) {
    personalInvitationById(id: $id) {
      _id
    }
  }
`;
