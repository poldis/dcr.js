import { BaseInterface } from './others';

export interface User extends BaseInterface {
	discordId: String,
	email: String,
	autoJoin: Number	
}