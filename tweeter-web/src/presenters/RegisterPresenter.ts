import { UserService } from "../model/service/UserService";
import { User, AuthToken } from "tweeter-shared";
import { Buffer } from "buffer";

export interface RegisterView{
  setImageBytes: (imageBytes: Uint8Array) => void;
  setImageFileExtension: (imageFileExtension: string) => void;
  setImageUrl: (imageUrl: string) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  displayErrorMessage: (message:string) => void
}

export class RegisterPresenter{
  private view: RegisterView;
  private userService: UserService;

  public constructor(view: RegisterView){
      this.view = view;
      this.userService = new UserService();
  }
    
  public handleImageFile(file: File|undefined){
    if (file) {
      this.view.setImageUrl(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );
        this.view.setImageBytes(bytes);
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.view.setImageFileExtension(fileExtension);
      }
    } else {
      this.view.setImageUrl("");
      this.view.setImageBytes(new Uint8Array());
    }
  };

  public getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  };

  public async doRegister (firstName: string, lastName: string, alias:string, password: string, rememberMe: boolean, imageBytes: Uint8Array, imageFileExtension:string){
    try {
      const [user, authToken] = await this.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes,
        imageFileExtension
      );
      console.log(
        firstName,
        lastName,
        alias,
        password,
        imageBytes,
        imageFileExtension
      );
      this.view.updateUserInfo(user, user, authToken, rememberMe);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`
      );
    }
  };

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]>{
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    const user: User|null = await this.userService.getFirstUser();
  
    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, await this.userService.getAuthToken()];
  };

}