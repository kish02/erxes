const segmentFields = `
  _id
  contentType
  name
  description
  subOf
  color
  conditions
`;

const segments = `
  query segments($contentType: String!) {
    segments(contentType: $contentType) {
      ${segmentFields}

      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

const segmentDetail = `
  query segmentDetail($_id: String) {
    segmentDetail(_id: $_id) {
      ${segmentFields}
      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;
const segmentsPreviewCount = `
  query segmentsPreviewCount($contentType: String!, $conditions: JSON) {
    segmentsPreviewCount(contentType: $contentType, conditions: $conditions)
  }
`;

const headSegments = `
  query headSegments {
    segmentsGetHeads {
      ${segmentFields}
      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

const combinedFields = `
  query fieldsCombinedByContentType($contentType: String!) {
    fieldsCombinedByContentType(contentType: $contentType)
  }
`;

const events = `
  query events($contentType: String!) {
    segmentsEvents(contentType: $contentType)
  }
`;

export default {
  segments,
  segmentDetail,
  headSegments,
  events,
  combinedFields,
  segmentsPreviewCount
};
