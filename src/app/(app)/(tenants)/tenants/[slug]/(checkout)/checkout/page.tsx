interface Props {
    params: Promise<{ slug: string }>;
}


const Page = async ({ params }: Props) => {
    const { slug } = await params;

    return <CheckoutView />
  
}

export default Page