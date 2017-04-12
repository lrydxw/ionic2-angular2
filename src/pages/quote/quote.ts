import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ViewController,ModalController, LoadingController, ToastController } from "ionic-angular";
import { NavParams } from "ionic-angular";
import { NavController } from 'ionic-angular';
import {Geolocation, Camera, File, Entry, FileError} from 'ionic-native';
import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";

/*import { Transfer } from 'ionic-native';*/
/*import { FileUploadOptions } from 'ionic-native';*/
/*import { Platform, ActionSheetController } from 'ionic-angular';*/
/*import { FormBuilder, Validators, FormGroup } from '@angular/forms';*/
declare var cordova: any;
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html'
})
export class QuotePage {
  pet:string="图斑信息"; 
  skill:string="photo"; 
  person: string;
  text: string;
  id: string;
  number:string;
  biaoshi:string;
  daima:string;
  tufu:string;
  quanshu:string;
  zuoluo:string;
  bianqian:string;
  dilei:string;
  tumian:string;
  qingkuang:string;
  wenhao:string;
  beizhu:string;
  tubu:string;
  yizhi:string;
  bili:string;
  waiye:string;
  length:string;
  area:string;
  
  locationIsSet = false;
  imageUrl = '';
  imageUrl1 = '';
  imageUrl2 = '';
  listItems: Ingredient[];
    //给image设置默认的图片
  profilePicture111: any="assets/img/live.jpg";
  constructor(private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private slService: ShoppingListService,
              private navParams: NavParams
        ) {
  }
/*  onSubmit(form: NgForm) {
    this.placesService
      .addPlace(form.value.title, form.value.description, this.imageUrl);
    form.reset();
    
    this.imageUrl = '';
    this.locationIsSet = false;
  }*/
 ionViewWillEnter() {
    this.loadItems();
  }
   onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }
  ionViewDidLoad() {
    this.person = this.navParams.get('person');
    this.text = this.navParams.get('text');
    this.id = this.navParams.get('id');
    this.number = this.navParams.get('number');
    this.biaoshi = this.navParams.get('biaoshi');
    this.daima = this.navParams.get('daima');
    this.tufu = this.navParams.get('tufu');
    this.quanshu = this.navParams.get('quanshu');
    this.zuoluo = this.navParams.get('zuoluo');
    this.bianqian = this.navParams.get('bianqian');
    this.dilei = this.navParams.get('dilei');
    this.tumian = this.navParams.get('tumian');
    this.qingkuang = this.navParams.get('qingkuang');
    this.wenhao = this.navParams.get('wenhao');
    this.tubu = this.navParams.get('tubu');
    this.yizhi = this.navParams.get('yizhi');
    this.bili = this.navParams.get('bili');
    this.waiye = this.navParams.get('waiye');
    this.length = this.navParams.get('length');
    this.area = this.navParams.get('area');
  }

  onClose(remove = false) {
    this.viewCtrl.dismiss(remove);
  }
  
   public path;
  /*profilePicture1: any = "https://www.gravatar.com/avatar/";*/
  //给image设置默认的图片
  profilePicture1: any="assets/img/live.jpg";

  profilePicture2: any="assets/icon/favicon.ico";
  profilePicture3: any="assets/img/video.png";



  
    onTakePhoto1() {
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: Entry) => {
                this.imageUrl1 = data.nativeURL;
                Camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl1 = '';
                const toast = this.toastCtrl.create({
                  message: '没有成功调用摄像头,请再尝试一次!',
                  duration: 2500
                });
                toast.present();
                Camera.cleanup();
              }
            );
          this.imageUrl1 = imageData;
          
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: '没有成功调用图片,请再尝试一次!',
            duration: 2500
          });
          toast.present();
        }
      );
  }
     onTakePhoto2() {
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: Entry) => {
                this.imageUrl2 = data.nativeURL;
                Camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl2 = '';
                const toast = this.toastCtrl.create({
                  message: '没有成功选中图片,请再尝试一次!',
                  duration: 2500
                });
                toast.present();
                Camera.cleanup();
              }
            );
          this.imageUrl2 = imageData;
          
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: '没有成功调用图片,请再尝试一次!',
            duration: 2500
          });
          toast.present();
        }
      );
  }
      choosePhoto() {


    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,//是否需要截图,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;
      this.profilePicture1=base64Image;
      alert(base64Image);
    }, (err) => {
      // Handle error
    });

  }

  saoPhoto() {
      var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,//是否需要截图,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;
      this.profilePicture2=base64Image;
      alert(base64Image);
    }, (err) => {
      // Handle error
    });

  }
       chooseVideo() {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,
      mediaType: 1,//为1时允许选择视频文件
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      this.path = base64Image;
      this.profilePicture3="assets/img/video.png";//选择视频后，image另外显示一张图片，目前还无法获取视频的第一帧图片。
      alert(this.path);
    }, (err) => {
      // Handle error
    });

  }
    
}
