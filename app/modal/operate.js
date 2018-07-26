module.exports = app => {
  let _f = {}
  for (let table in app.config.mongoConf.tables) {
    _f[table] = {
      find(sql) {
        return new Promise((resolve, reject) => {
          app.mongo[table].find(sql, (err, res) => {
            if (err) {
              console.log(err);
              resolve({
                code: 201,
                data: {},
                msg: `fail: ${err}`
              });
            } else {
              resolve({
                code: 200,
                data: {
                  list: res
                },
                msg: 'success'
              });
            }
          })
        });
      },

      insert(sql) {
        return new Promise((resolve, reject) => {
          sql = Object.assign(sql, {
            updateTime: (+new Date() + 28800000),
            createTime: (+new Date() + 28800000)
          })
          app.mongo[table].insertMany(sql, function (err, res) {
            if (err) {
              console.log(err);
              resolve({
                code: 201,
                data: {},
                msg: `fail: ${err}`
              });
            }
            else {
              resolve({
                code: 200,
                data: res,
                msg: 'success'
              });
            }

          });
        });

      },

      update(sql, newDate) {
        return new Promise((resolve, reject) => {
          newDate = Object.assign(newDate, { updateTime: (+new Date() + 28800000) })
          app.mongo[table].update(sql, newDate, (err, res) => {
            if (err) {
              console.log(err);
              resolve({
                code: 201,
                data: {},
                msg: `fail: ${err}`
              });
            } else {
              resolve({
                code: 200,
                data: res,
                msg: 'success'
              });
            }
          })
        });
      },

      remove(sql) {
        return new Promise((resolve, reject) => {
          app.mongo[table].remove(sql, (err, res) => {
            if (err) {
              console.log(err);
              resolve({
                code: 201,
                data: {},
                msg: `fail: ${err}`
              });
            } else {
              resolve({
                code: 200,
                data: res,
                msg: 'success'
              });
            }
          })
        });
      }
    };
  }

  return _f;
 
}