import { generalOptionFilter } from '@/utils'
import { CONDITION_RELATION_OPTIONS, AMOUNT_RELATION_OPTIONS, CONDITION_OPTIONS, LEADER_OPTIONS, ORGANIZATION_LEADER_OPTIONS, FEETYPE_CONDITION_RELATION_OPTIONS } from './constant'

export const conditonRelationFilter = generalOptionFilter(CONDITION_RELATION_OPTIONS);

export const feeTypeConditonRelationFilter = generalOptionFilter(FEETYPE_CONDITION_RELATION_OPTIONS);

export const amountRelationFilter = generalOptionFilter(AMOUNT_RELATION_OPTIONS);

export const conditionTypeFilter = generalOptionFilter(CONDITION_OPTIONS);

export const leaderLevelFilter = generalOptionFilter(LEADER_OPTIONS);

export const organLeaderLevelFilter = generalOptionFilter(ORGANIZATION_LEADER_OPTIONS);