import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.services";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/add/operator/map'
import { AuthService } from "../auth/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class DataStorageService {

    userId:string;

    constructor( private http: Http, 
                 private recipeService: RecipeService,
                 private authService: AuthService,
                 private db: AngularFireDatabase,
                 private afAuth: AngularFireAuth) {

                    this.afAuth.authState.subscribe(
                        user => {
                            if (user) this.userId = user.uid;
                        }
                    )
                 }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put(`https://angular-recipe-book-93785.firebaseio.com/recipes/${this.userId}.json?auth=${token}`, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.http.get(`https://angular-recipe-book-93785.firebaseio.com/recipes/${this.userId}.json?auth=${token}`)
        .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe["ingredients"]) {
                        recipe["ingredients"] = []
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);

            }
        )
    }
}