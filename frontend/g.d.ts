declare module "*.css";
declare module "*.svg" {
  const content: string;
  export default content;
}
declare var props: any;
declare var store: any;
