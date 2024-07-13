import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import aggregateData from '@/app/lib/reportAggrigation';
import fs from 'fs'
import path from 'path'


interface Data {}

export const POST = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log({req, res})
  if (req.method == 'POST') {
    const data = await fs.readFileSync(
      path.resolve(process.cwd(), "src/app/data/5000_examples.json"),
      "utf-8",
    );
    const dataObj = JSON.parse(data)
    const result = aggregateData(dataObj, 'Date_UTC')
    return NextResponse.json({
      status: 'ok',
      data: result
    }, { status: 200 })
  }
  else {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405});
  }
}

