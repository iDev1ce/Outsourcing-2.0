import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import authUsuario from "../config/authUsuario"

interface TokenPayload {
    int: number
    exp: number
    sub: string
}

export default function auth(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization

    if(!authHeader)
        throw new Error("Token not found")

    const [, token] = authHeader.split(' ')

    const decode = verify(token, authUsuario.secret)

    const { sub } = decode as TokenPayload

    req.user = {
        id: sub
    }

    return next()
}