import { SettingsActions } from "ic-redux/actions/settings/model";
import { AgentsDataActions } from "./agents/model";

export type RootAction = SettingsActions | AgentsDataActions;
