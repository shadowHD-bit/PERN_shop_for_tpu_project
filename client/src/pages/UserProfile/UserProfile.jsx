import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..';
import { getData } from '../../http/userAPI';
import './UserProfile.scss'


 const UserProfile = observer(() => {

    const [changeData, setChangeData] = useState(false)
    const [load, setload] = useState(false)
    const {user} = useContext(Context);

    useEffect(() => {
        getData(user.user.id).then((data) => {
            user.setUserProf(data)
        })
    },[load] )
    
  return (
    <div class="container rounded bg-white mt-5 mb-5 profile">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span class="font-weight-bold">{user.userProf.name}</span><span class="text-black-50"></span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Информация о профиле</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Имя</label><input disabled={!changeData ? true : false} type="text" class="form-control" placeholder="first name" value={user.userProf.name}/></div>
                    <div class="col-md-6"><label class="labels">Фамилия</label><input disabled={!changeData ? true : false} type="text" class="form-control" value={user.userProf.family} placeholder="surname" /></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Номер телефона</label><input disabled={!changeData ? true : false} type="text" class="form-control" placeholder="enter phone number" value={user.userProf.numberPhone} /></div>
                    <div class="col-md-12"><label class="labels">Дата рождения</label><input disabled={!changeData ? true : false} type="date" class="form-control" placeholder="enter address line 1" value={user.userProf.date_birthday} /></div>
                    <div class="col-md-12"><label class="labels">Почта</label><input disabled={true} type="text" class="form-control" placeholder="enter address line 2" value={user.userProf.email} /></div>
                    <div class="col-md-12"><label class="labels">Роль</label><input disabled={true} type="text" class="form-control" placeholder="enter address line 2" value={user.userProf.role} /></div>
                    <div class="col-md-12"><label class="labels">Дата регистрации</label><input disabled={true} type="datetime" class="form-control" placeholder="enter address line 2" value={user.userProf.createdAt} /></div>
                    {/* <div class="col-md-12"><label class="labels">Area</label><input type="text" class="form-control" placeholder="enter address line 2" value="" /></div>
                    <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="enter email id" value="" /></div>
                    <div class="col-md-12"><label class="labels">Education</label><input type="text" class="form-control" placeholder="education" value="" /></div> */}
                </div>
                {/* <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value="" /></div>
                    <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state" /></div>
                </div> */}

                {!changeData ? 
                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={() => setChangeData(true)}>Изменить</button></div>
                : 
                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Сохранить</button><button className="btn btn-primary profile-button ml-2" type="button" onClick={() => setChangeData(false)}>Отмена</button></div>
                }

            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
            <h4 class="text-center">Последнии покупки</h4>
                
            </div>
        </div>
    </div>
</div>
)
})


export default UserProfile