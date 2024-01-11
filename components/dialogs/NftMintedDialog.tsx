import Dialog, { DialogProps } from '@mui/material/Dialog'
// import CloseIcon from 'public/assets/vector-icons/close.svg'
import { useFetchNft } from '@/api/nft'
import Image from 'next/image'
import { CircularProgress } from '@mui/material'
import { getRarityIcon } from '../comicIssue/UnwrapIssueDialogItem'
import Link from 'next/link'

interface Props extends DialogProps {
	onClose: VoidFunction
	nftAddress?: string
}

const NftMintedDialog: React.FC<Props> = ({ open, onClose, nftAddress, ...props }) => {
	const { data: nft } = useFetchNft(nftAddress || '')

	return (
		<Dialog
			style={{ backdropFilter: 'blur(4px)' }}
			PaperProps={{ className: 'minted-nft-dialog' }}
			onClose={onClose}
			open={open}
			maxWidth='xs'
			{...props}
		>
			{nft ? (
				<>
					<div className={`trait-label trait-label--${nft.rarity.toLowerCase()}`}>
						<div className={`rarity rarity--${nft.rarity.toLowerCase()}`}>
							{getRarityIcon(nft.rarity)} {nft.rarity}
						</div>
						<br />
						{nft.name}
					</div>
					<Link
						href={encodeURI(
							`https://twitter.com/intent/tweet?text=${`${
								nft.rarity.toLowerCase() === 'legendary' ? 'Fock yea! ' : ''
							}I just minted a ${nft.rarity.toLowerCase()} copy of the Enter the Tensorverse comic! 👾

Mint yours here while the supply lasts.👇
https://dreader.app/mint/tensorverse?utm_source=tensor`}`
						)}
						target='_blank'
						className='twitter-button'
					>
						Share on &#120143;
					</Link>
					<Image src={nft.image} width={690} height={1000} alt='Comic' className='cover-image' />
				</>
			) : (
				<CircularProgress thickness={6} classes={{ svg: 'loader', root: 'loader--root' }} />
			)}
		</Dialog>
	)
}

export default NftMintedDialog
