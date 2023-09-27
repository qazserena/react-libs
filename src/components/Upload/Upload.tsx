import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Upload as AntdUpload,
  UploadProps as AntdUploadProps,
} from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { UploadOutlined } from '@ant-design/icons'

export type UploadProps = Omit<AntdUploadProps, 'fileList' | 'onChange'> & {
  value?: string | string[]
  maxCount: number
  onChange?: (value: string | string[]) => void
}

export const Upload = (props: UploadProps) => {
  const showTrigger = useMemo<boolean>(() => {
    return props.listType !== 'picture-card'
  }, [props.listType])

  const [fileList, setFileList] = useState<UploadFile<string>[]>()

  const defaultFileList = useMemo<UploadFile<any>[]>(() => {
    if (typeof props.value === 'string') {
      return [
        {
          uid: props.value,
          name: '',
          status: 'done',
          url: props.value,
        },
      ]
    } else if (Array.isArray(props.value)) {
      return props.value.map(value => {
        return {
          uid: value,
          name: '',
          status: 'done',
          url: value,
        }
      })
    } else {
      return []
    }
  }, [props.value])

  useEffect(() => {
    setFileList(defaultFileList)
  }, [defaultFileList])

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'done') {
      setFileList(info.fileList)
    } else {
      const results = info.fileList.map(file => {
        return file.response || file.url
      })
      if (props.maxCount === 1) {
        props.onChange && props.onChange(results[0])
      } else {
        props.onChange && props.onChange(results)
      }
    }
  }

  return (
    <AntdUpload
      {...props}
      maxCount={props.maxCount}
      fileList={fileList}
      name="file"
      onChange={handleChange}
    >
      {showTrigger ? (
        <Button icon={<UploadOutlined />}>点击上传</Button>
      ) : (
        <span>点击上传</span>
      )}
    </AntdUpload>
  )
}
