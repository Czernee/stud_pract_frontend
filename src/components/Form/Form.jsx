import React, {useCallback, useEffect, useState} from "react";
import './Form.css'
import { useTelegram } from "../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pickUpPoint, setPickUpPoint] = useState('');
    const [errors, setErrors] = useState({});
    const {tg} = useTelegram();

    const validateFields = () => {
        let tempErrors = {};
        if (!name.trim()) {
            tempErrors.name = "ФИО обязательно для заполнения";
        }
        if (!phoneNumber.match(/^\d{10}$/)) {
            tempErrors.phoneNumber = "Номер телефона должен состоять из 10 цифр";
        }
        if (!pickUpPoint) {
            tempErrors.pickUpPoint = "Выберите пункт выдачи";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const onSendData = useCallback(() => {
        const data = {
            name, 
            phoneNumber, 
            pickUpPoint
        }
        tg.sendData(JSON.stringify(data))
    }, [tg, name, phoneNumber, pickUpPoint])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [tg, onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [tg])

    useEffect(() => {
        if (!name || !phoneNumber || !pickUpPoint) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [phoneNumber, name, pickUpPoint, tg])

    const onChangeName = (e) => {
        setName(e.target.value)
        if (errors.name) validateFields()
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
        if (errors.phoneNumber) validateFields()
    }

    const onChangePickUpPoint = (e) => {
        setPickUpPoint(e.target.value)
        if (errors.pickUpPoint) validateFields()
    }

    return (
        <div className={'form'}>
            <h3>Введите ваше ФИО</h3>
            <input className={'input'} type='text' placeholder={'Иванов Иван Иванович'} value={name} onChange={onChangeName} minLength={8} maxLength={40} required/> 
            {errors.name && <span className="error">{errors.name}</span>}
            <h3>Введите номер телефона</h3>
            <input className={'input'} type='text' placeholder={'89886091234'} value={phoneNumber} onChange={onChangePhoneNumber} minLength={10} maxLength={11} required/>
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            <h3>Выберите пункт выдачи</h3>
            <select value={pickUpPoint} onChange={onChangePickUpPoint} className={'select'} required>
                <option value={''}>Выберите пункт выдачи</option>
                <option value={'Медногорский'}>Медногорский</option>
                <option value={'Преградная'}>Преградная</option>
                <option value={'Черкесск'}>Черкесск</option>
            </select>
            {errors.pickUpPoint && <span className="error">{errors.pickUpPoint}</span>}
        </div>
    )
}

export default Form