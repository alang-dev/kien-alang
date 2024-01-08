import { InferGetStaticPropsType } from "next"
import { getFinanceIndexDataValue } from "@/stock-api/vietstock"

function Index({ hello }: InferGetStaticPropsType<typeof getStaticProps>) {
  return hello
}

export default Index

export const getStaticProps = async () => {
  await getFinanceIndexDataValue('TNG')

  return {
    props: {
      hello: "world",
    },
  }
}
