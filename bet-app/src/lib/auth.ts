import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "dev-secret";

export async function hashPassword(plain: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(plain, salt);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
	return bcrypt.compare(plain, hash);
}

export function signJwt(payload: object, expiresIn: string | number = "7d"): string {
	return jwt.sign(payload as any, jwtSecret, { expiresIn });
}

export function verifyJwt(token: string): any {
	try {
		return jwt.verify(token, jwtSecret);
	} catch {
		return null;
	}
}


