import { PostSegment } from "../domain/PostSegment";
import { PostSegmentDTO } from "./PostSegmentDto";
import { UserDTO } from "./UserDto";

export interface StatusDTO {
    readonly post: string;
    readonly user: UserDTO;
    readonly timestamp: number;
    readonly segments: PostSegmentDTO[];
}



      