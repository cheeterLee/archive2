import useArchiveMarket from '@/hooks/useArchiveMarket'
import React from 'react'

export interface IDashboardPageProps {}

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = props => {
    const { ownedNFTs } = useArchiveMarket()
    console.log(ownedNFTs)
    
    return <div>dashboard</div>
}

export default DashboardPage