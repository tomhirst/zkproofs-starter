import { defineDocumentType, makeSource } from 'contentlayer/source-files';
 
export const Blog = defineDocumentType(() => ({
  name: "Blog",
  contentType: "mdx",
  filePathPattern: "blog/*.mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `${doc._raw.flattenedPath}`,
    },
  },
}));
 
export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog]
});