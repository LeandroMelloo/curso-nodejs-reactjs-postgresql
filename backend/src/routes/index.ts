import { Router } from 'express';
import loginTypeRouter from './login.routes.ts';
import receitasTypeRouter from './receitas.routes.ts';
import despesasTypeRouter from './despesas.routes.ts';
import movimentosTypeRouter from './movimentos.routes.ts';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/receitas', ensureAuthenticated, receitasTypeRouter);
routes.use('/despesas', ensureAuthenticated, despesasTypeRouter);
routes.use('/movimentos', ensureAuthenticated, movimentosTypeRouter);
routes.use('/login', loginTypeRouter);

export default routes;