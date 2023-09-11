const cdn_notify = async (request: Request) => {
  console.log('from the cdn', { request });
};

export { cdn_notify as POST, cdn_notify as GET };
