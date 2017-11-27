import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';
import {Comment} from '../../shared/comment';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentform: FormGroup;
  COMMENTS : Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,
    private formBuilder: FormBuilder) {
      this.commentform = this.formBuilder.group({
        author: ['',Validators.required],
        rating: 5,
        comment:['',Validators.required],
        date:''
      });
  }


  
  
  
  dismiss(){
    this.viewCtrl.dismiss();
  }


  onSubmit(){

    console.log(this.commentform.value);
    let d = new Date();
    let n = d.toISOString();
    let data = this.commentform.value;
    data["date"] = (n);
   this.viewCtrl.dismiss(data);
  
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}
