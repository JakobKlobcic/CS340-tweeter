
import { Type } from "../domain/PostSegment";

export interface PostSegmentDTO{
    readonly text: string;
    readonly startPosition: number;
    readonly endPosition: number;
    readonly type: Type;
}
