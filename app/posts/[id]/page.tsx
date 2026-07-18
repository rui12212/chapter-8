import  DetailUI  from "./_components/DetailUI";

type ParamPageProps = {
  params: Promise<{ id: string }>;
};

const DetailPage = async ({params}: ParamPageProps) => {
  const {id} = await params;

  return (
    <DetailUI id={id}/>
  )
}

export default DetailPage;
