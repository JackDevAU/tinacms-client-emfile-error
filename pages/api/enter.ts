// FIXME: fix ts errors
import { isUserAuthorized } from '@tinacms/auth';
import { NextApiRequest, NextApiResponse } from 'next';
export const runtime = 'nodejs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req?.query?.slug == null) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (process.env.NODE_ENV === 'development') {
        // Enter preview-mode in local development
        res.setPreviewData({});
        //@ts-ignore
        return res.redirect(req.query.slug);
    }

    // Check tina cloud token
    const isAuthorizedRes = await isUserAuthorized({
        token: `Bearer ${req.query.token}`,
        //@ts-ignore
        clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    });

    if (isAuthorizedRes) {
        res.setPreviewData({});
        //@ts-ignore
        return res.redirect(req.query.slug);
    }

    return res.status(401).json({ message: 'Invalid token' });
};

export default handler;
