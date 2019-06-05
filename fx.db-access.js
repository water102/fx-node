const fs = require('fs');
const path = require('path');

// http://docs.sequelizejs.com/manual/installation/getting-started.html

const {
  Sequelize
} = require('sequelize');

const fxLogger = require('./fx.logger');

class FxDbAccess {
  constructor() {
    fxLogger.info('FxDbAccess.init');
    this.sequelize = null;
    this.models = {};
  }

  connect(dbConfig) {
    if (this.sequelize != null) return this;

    this.sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        dialect: 'mysql',
        pool: {
          max: 90,
          min: 30,
          acquire: 30000,
          idle: 10000
        }
      }
    );

    return this;
  }

  defineModels(modelsPath) {
    const self = this;

    let dirPath = global.serverMapping(modelsPath);
    let fileNames = fs.readdirSync(dirPath);
    fileNames
      .filter(i => path.extname(i) === '.js')
      .forEach(file => {
        const modelName = file.replace(/\.[^/.]+$/, '');
        let defineModel = require(path.join(dirPath, file));
        self.models[modelName] = defineModel(self.sequelize, Sequelize);
      });
  }

  authenticate() {
    return this.sequelize.authenticate();
  }

  getModel(modelName) {
    this.connect();
    return this.models[modelName];
  }

  // SELECT * FROM users WHERE name LIKE :search_name
  // replacements: { search_name: 'ben%' }
  //
  // SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status
  // bind: { status: 'active' }
  //
  // $$ used to escape a literal $ sign

  insert(cmd, replacements, bind) {
    let {
      sequelize
    } = this;

    return sequelize.query(cmd, {
      replacements,
      bind,
      type: sequelize.QueryTypes.INSERT
    });
  }

  update(cmd, replacements, bind) {
    let {
      sequelize
    } = this;

    return sequelize.query(cmd, {
      replacements,
      bind,
      type: sequelize.QueryTypes.UPDATE
    });
  }

  upsert(cmd, replacements, bind) {
    let {
      sequelize
    } = this;

    return sequelize.query(cmd, {
      replacements,
      bind,
      type: sequelize.QueryTypes.UPSERT
    });
  }

  query(cmd, replacements, bind) {
    let {
      sequelize
    } = this;

    return sequelize.query(cmd, {
      replacements,
      bind,
      type: sequelize.QueryTypes.SELECT
    });
  }

  delete(cmd, replacements, bind) {
    let {
      sequelize
    } = this;

    return sequelize.query(cmd, {
      replacements,
      bind,
      type: sequelize.QueryTypes.DELETE
    });
  }

  raw(cmd, replacements, bind) {
    let {
      sequelize
    } = this;

    return sequelize.query(cmd, {
      replacements,
      bind,
      type: sequelize.QueryTypes.raw
    });
  }
}

module.exports = new FxDbAccess();