import React, { useState, forwardRef, useImperativeHandle } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { BASE_IMG_URL } from "../../../../../utils/constant";

// 获取图片基本路径

// 解析图片
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PicUpload = (props, ref) => {
  // 预览相关钩子
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState([]);
  const [delImgsArr, setDelImgsArr] = useState([]);
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList, file }) => {
    if (file.status === "done") {
      const {
        response: { status, data },
      } = file;
      if (status === 0) {
        let target = fileList[fileList.length - 1];
        target.name = data.name;
        target.url = data.url;
        message.success("上传图片成功");
      } else {
        message.error("上传失败");
      }
    } else if (file.status === "removed") {
      delImgsArr.push(file.name);
      setDelImgsArr([...delImgsArr]);
    }
    setFileList(fileList);
  };
  // const handleMove = () => {};
  useImperativeHandle(ref, () => ({
    // 获取图片名称数组
    getImgs: () => {
      return fileList.map((e) => e.name);
    },
    // 修改页面获取图片数据
    setImgs: (values) => {
      setFileList(
        values.map((e, i) => ({
          uid: -i,
          name: e,
          status: "done",
          url: `${BASE_IMG_URL}${e}`,
        }))
      );
    },
    // 修改时删除图片文件
    delImgs: () => {
      return delImgsArr;
    },
  }));

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div>
      <Upload
        accept="image/*"
        name="image"
        action="/api/manage/img/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        // onRemove={handleMove}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};
export default forwardRef(PicUpload);
