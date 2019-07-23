import { TokensModel } from "./models/toke-tokens.model";
import * as App from "../../../common/component";

class TokeTokensComponent extends App.CommonComponent {
    constructor() {
        super();
        this.modelDb = TokensModel;
    }   
}
var tokeTokensComponent = new TokeTokensComponent();
export {tokeTokensComponent};
