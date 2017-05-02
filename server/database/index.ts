import Context from './context';

const dbContext = new Context();

if (process.env.DB_SYNC === 'true') {
  dbContext.db.sync({ force: true });
}

export default dbContext;
