import React, {
    Dispatch,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from 'react'
import {
    validateEmail,
    validateName,
    validatePhoneNumber,
} from '../../../helpers/validation'
import { personalDataType, ValidType } from '../../../utils/data'
import Button from '../../ui/Button'
import Heading from '../../ui/Heading'

interface Props {
    onSubmitPersonal: (e: FormEvent<Element>) => void
    setPersonal: Dispatch<React.SetStateAction<personalDataType>>
    personal: personalDataType
}

const PersonalInfo = ({ onSubmitPersonal, personal, setPersonal }: Props) => {
    const [emailValid, setEmailValid] = useState<ValidType>({
        errorText: '',
        isValid: null,
    })
    const [nameValid, setNameValid] = useState<ValidType>({
        errorText: '',
        isValid: null,
    })
    const [phoneValid, setPhoneValid] = useState<ValidType>({
        errorText: '',
        isValid: null,
    })
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (validateName(personal.name)) {
            return setNameValid({
                errorText: 'Iltimos ismingizni kiriting boy aka',
                isValid: false,
            })
        } else {
            setNameValid({
                errorText: '',
                isValid: true,
            })
        }

        if (validateEmail(personal.email)) {
            return setEmailValid({
                errorText: 'Iltimos emailni kiriting boy aka',
                isValid: false,
            })
        } else {
            setEmailValid({
                errorText: '',
                isValid: true,
            })
        }

        if (validatePhoneNumber(personal.phone)) {
            return setPhoneValid({
                errorText: 'Iltimos telefon raqamingizni kiriting boy aka',
                isValid: false,
            })
        } else {
            setPhoneValid({
                errorText: '',
                isValid: true,
            })
        }

        onSubmitPersonal(e)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex-1 md:px-16 md:py-6 flex flex-col gap-2 responsiveSection"
        >
            <div className="flex flex-col mb-6">
                <Heading>Personal Info</Heading>
                <p className="text-coolGray mt-2">
                    Please provide your name, email address, and phone number.
                </p>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <label className="text-marineBlue" htmlFor="name">
                        Name
                    </label>
                    {nameValid.isValid === false && (
                        <p className="text-strawberryRed">
                            {nameValid.errorText}
                        </p>
                    )}
                </div>
                <input
                    id="name"
                    onChange={(e) =>
                        setPersonal((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    value={personal.name}
                    className={`${
                        nameValid.isValid === false
                            ? 'border-strawberryRed'
                            : ''
                    } cursor-pointer hover:border-purplishBlue outline-none bg-gray-50 border border-lightGray text-gray-900 text-md rounded-lg focus:border-purplishBlue focus:marineBlue focus:border focus:border-gray-100 block w-full p-2.5`}
                    type="text"
                    placeholder="isminizni kiriting"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <label className="text-marineBlue" htmlFor="email">
                        Email Address
                    </label>
                    {!emailValid.isValid && (
                        <p className="text-strawberryRed">
                            {emailValid.errorText}
                        </p>
                    )}
                </div>
                <input
                    id="email"
                    onChange={(e) =>
                        setPersonal((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                    value={personal.email}
                    className={`${
                        emailValid.isValid === false
                            ? 'border-strawberryRed'
                            : ''
                    } cursor-pointer hover:border-purplishBlue outline-none bg-gray-50 border border-lightGray text-gray-900 text-md rounded-lg focus:border-purplishBlue focus:marineBlue  block w-full p-2.5`}
                    type="email"
                    placeholder="emailingizni kiriting"
                    required={false}
                />
            </div>

            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <label className="text-marineBlue" htmlFor="name">
                        Phone Number
                    </label>
                    {!phoneValid.isValid && (
                        <p className="text-strawberryRed">
                            {phoneValid.errorText}
                        </p>
                    )}
                </div>
                <input
                    id="phone"
                    onChange={(e) =>
                        setPersonal((prev) => ({
                            ...prev,
                            phone: e.target.value,
                        }))
                    }
                    value={personal.phone}
                    className={`${
                        phoneValid.isValid === false
                            ? 'border-strawberryRed'
                            : ''
                    } cursor-pointer hover:border-purplishBlue outline-none bg-gray-50 border border-lightGray text-gray-900 text-md rounded-lg focus:border-purplishBlue focus:marineBlue  block w-full p-2.5`}
                    type="text"
                    placeholder="telefon raqamingizni kiriting"
                />
            </div>
            <div className="ml-auto mt-auto responsiveButton">
                <Button>Next Step</Button>
            </div>
        </form>
    )
}

export default PersonalInfo
