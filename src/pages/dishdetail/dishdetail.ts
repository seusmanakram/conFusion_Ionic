import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController ,ModalController } from 'ionic-angular';
import {Dish} from '../../shared/dish';
import {Comment} from '../../shared/comment';
import {FavoriteProvider} from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';
import {SocialSharing} from '@ionic-native/social-sharing';


/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish:Dish;
  errMess:string;
  avgstars:string;
  numcomments:number;
  favorite:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl:ToastController,
    public actionSheetCtrl:ActionSheetController,
    public modalCtrl: ModalController,
    private socialSharing:SocialSharing,
   

  @Inject('BaseURL') private BaseURL,
  private favoriteservice:FavoriteProvider) {

    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    let total =0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total/this.numcomments).toFixed(2)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }


  addToFavorites(){
    console.log('Adding to Favorites',this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message:'Dish' + this.dish.id + 'added as a favorite successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }

 

  presentActionSheet(){

    let actionSheet = this.actionSheetCtrl.create({

      title:'Select Actions',
      buttons:[

        {
          text:'Add to Favorites',
          role:'addtofavorites',
          handler: () =>{
            console.log('Adding to Favorites by Action Sheet button ',this.dish.id);
            this.favorite = this.favoriteservice.addFavorite(this.dish.id);
            this.toastCtrl.create({
              message:'Dish' + this.dish.id + 'added as a favorite successfully',
              position: 'middle',
              duration: 3000
            }).present();
          }
        },
        {
          text:'Add Comment',
          role:'addcomment',
          handler: () =>{  
              let modal = this.modalCtrl.create(CommentPage);
              modal.present(); 
              modal.onDidDismiss(data => {
               
             
                this.dish.comments.push(data);
                console.log(data);
              });
          }
        },{
          text:'Share via Facebook',
          handler: () =>{
            this.socialSharing.shareViaFacebook(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
                .then(() => console.log('Posted successfully to Facebook'))
                  .catch(()=> console.log('Failed to post to Facebook'));
          
          } 

        },{

          text:'Share via Twitter',
          handler: () =>{
            this.socialSharing.shareViaTwitter(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
                .then(() => console.log('Posted successfully to Twitter'))
                  .catch(()=> console.log('Failed to post to Twitter'));
          
          } 

        },
        {
          text:'Cancel',
          role:'cancel',
          handler: () =>{
            console.log("Action Cancelled!");
          }
        }


      ]

    });

    actionSheet.present();
  }

  


  

}
