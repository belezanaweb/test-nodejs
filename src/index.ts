import app from './app'
import sequelize from './config/sequelize';

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  sequelize.sync({force: true});
  console.log(`Server started on port ${port}`);
})

export default server
