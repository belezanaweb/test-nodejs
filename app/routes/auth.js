auth = function(req, res, next) {
  var token = req.body.token;

  if (!token){
    res.format({
      html: function(){
          //precisamos passar no segundo parametro um array com os resultados
          res.render("index",{msg:'Gere um token'});   
      },
      json: function(){
          return res.status(401).send({ auth: false, message: 'No token provided.' });
      }
    })
  } 
    
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if(err){
      res.format({
        html: function(){
            //precisamos passar no segundo parametro um array com os resultados
            res.render("index",{msg:'Token inválido ou expirado, por favor gere o token novamente'});   
        },
        json: function(){
          return res.status(500).send({ auth: false, message: 'Token inválido ou expirado, por favor gere o token novamente' });
        }
      })
    }
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}
// auth = function(req, res, next) {
//     if (req.session && req.session.user === "amy" && req.session.admin)
//       return next();
//     else
//       return res.render('coreui/login');
//       // return res.sendStatus(401);
// }
