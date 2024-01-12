import jwt from 'jsonwebtoken';

const TOKEN_KEY = "x4TvnErxRETbVcqaL15dqM1115eN1p5y";



export const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token==null)
    return res.status(401) .send("Token requerido");
  jwt.verify(token, TOKEN_KEY, (err: any, user: any) => {
    if(err) return res.status(403).send("Token invalido");
    req.user = user;
    next();
  });
}