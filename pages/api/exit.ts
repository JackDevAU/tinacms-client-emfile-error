// FIXME: fix ts errors
import { NextApiRequest, NextApiResponse } from 'next';
export const runtime = 'nodejs';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.clearPreviewData();
    //@ts-ignore
    res.redirect(req.query.slug);
};

export default handler;
