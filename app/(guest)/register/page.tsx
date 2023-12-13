'use client'

import Header from 'components/layout/Header'
import Button from 'components/Button'
import Input from '@/components/forms/Input'
import LogoIcon from 'public/assets/vector-icons/logo-with-text.svg'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { RegisterData } from 'models/auth/register'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRegisterUser } from 'api/auth'
import { RoutePath } from 'enums/routePath'
import { registerValidationSchema } from '@/constants/schemas'
import { usernameTooltip } from '@/constants/tooltips'
import Form from '@/components/forms/Form'
import usePrefetchRoute from '@/hooks/usePrefetchRoute'
import FormActions from '@/components/forms/FormActions'
import Label from '@/components/forms/Label'
import Steps from '@/components/Steps'
import { useRedeemUserReferral } from '@/api/user'

export default function RegisterUserPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const referrer = searchParams.get('referrer') || ''
	const nextPage = RoutePath.RegisterConnectWallet

	const { mutateAsync: registerUser } = useRegisterUser()
	const { mutateAsync: redeemReferral } = useRedeemUserReferral()
	const { register, handleSubmit } = useForm<RegisterData>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
		resolver: yupResolver(registerValidationSchema),
	})

	usePrefetchRoute(nextPage)

	const onSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		handleSubmit(async (data) => {
			await registerUser(data)
			if (referrer) await redeemReferral(referrer)
			router.push(nextPage)
		})()
	}

	return (
		<>
			<Header image={<LogoIcon className='logo' />} />
			<Steps
				steps={[
					{ label: '01 Create account', isActive: true },
					{ label: '02 Connect wallet', isActive: false },
					{ label: '03 Verify email', isActive: false },
				]}
			/>

			<main className='register-page'>
				<h1 className='title'>Welcome to dReader</h1>

				<Form centered fullWidth maxSize='sm' className='form--register-user'>
					<Label isRequired tooltipText={usernameTooltip}>
						Username
					</Label>
					<p className='description'>2-20 characters. Letters, numbers, and dashes are allowed</p>
					<Input {...register('name')} placeholder='john-doe' />

					<Label isRequired>Email</Label>
					<Input {...register('email')} placeholder='john.doe@dreader.io' />

					<Label isRequired>Password</Label>
					<p className='description'>8 characters minimum. At least 1 lowercase, 1 uppercase and 1 number</p>
					<Input {...register('password')} type='password' placeholder='********' />

					<FormActions centered>
						<Button type='submit' onClick={onSubmitClick} backgroundColor='yellow-500' className='action-button'>
							Register
						</Button>
					</FormActions>
				</Form>
			</main>
		</>
	)
}
