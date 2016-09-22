const mongoOpts = {
  port: 27017
};
if(process.env.NO_DOCKER) {
  mongoOpts['host'] = 'localhost';
} else {
  mongoOpts['host'] = 'minkmongo';
}
export const mongoUrl = `mongodb://${mongoOpts.host}:${mongoOpts.port}/martenblog`;
export const entriesPerPage = 11;

