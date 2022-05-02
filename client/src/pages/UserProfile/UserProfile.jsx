import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import { Context } from '../..';
import { getData } from '../../http/userAPI';
import './UserProfile.scss'


 const UserProfile = observer(() => {

    const { user } = useContext(Context);
    
  return (
    <div class="container rounded bg-white mt-5 mb-5 profile">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span class="font-weight-bold">Edogaru</span><span class="text-black-50"></span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Информация о профиле</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Имя</label><input type="text" class="form-control" placeholder="first name"/></div>
                    <div class="col-md-6"><label class="labels">Фамилия</label><input type="text" class="form-control" value="" placeholder="surname" /></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" value="" /></div>
                    <div class="col-md-12"><label class="labels">Address Line 1</label><input type="text" class="form-control" placeholder="enter address line 1" value="" /></div>
                    <div class="col-md-12"><label class="labels">Address Line 2</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                    <div class="col-md-12"><label class="labels">Postcode</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                    <div class="col-md-12"><label class="labels">State</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                    <div class="col-md-12"><label class="labels">Area</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                    <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="enter email id" value="" /></div>
                    <div class="col-md-12"><label class="labels">Education</label><input type="text" class="form-control" placeholder="education" value="" /></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value="" /></div>
                    <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state" /></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Сохранить</button></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
            <h4 class="text-center">Покупки</h4>
                
            </div>
        </div>
    </div>
</div>
)
})


export default UserProfile