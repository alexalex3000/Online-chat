import {db} from "../../db";
import {settingsTable} from "../../db/schema";
import {SettingsTitleTypes} from "./settings.schema";
import {eq, sql} from "drizzle-orm";

export class SettingsService {
    async getSettings(userId: string) {
        const [response] = await db
            .select({
                chatSounds: settingsTable.chatSounds,
                pinnedMessageAlerts: settingsTable.pinnedMessageAlerts,
                doNotDistract: settingsTable.doNotDistract,
                showOnlineStatus: settingsTable.showOnlineStatus,
            })
            .from(settingsTable)
            .where(eq(settingsTable.userId, userId))

        return response ?? null
    }

    async changeSetting(setting: SettingsTitleTypes, userId: string){
        const updateData = Object.fromEntries(
            Object.entries(setting).filter(([_, value]) => value !== undefined)
        );

        if(Object.keys(updateData).length == 0){
            return await db.query.settingsTable.findFirst({
                where: eq(settingsTable.userId, userId)
            })
        }

        const [updated] = await db
            .update(settingsTable)
            .set(updateData)
            .where(eq(settingsTable.userId, userId))
            .returning();

        return updated;
    }
}

export const settingsServiceObj = new SettingsService()