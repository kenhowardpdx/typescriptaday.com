import Context from './context';

const dbContext = new Context();

dbContext.db.sync({ force: process.env.DB_SYNC === 'true' ? true : false })

export default dbContext;