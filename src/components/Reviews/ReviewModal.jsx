import { useState } from "react";
import { Button, Form, Modal, Input, Rate } from "antd";


import { setRating } from "../../redux/features/filterSlice";
import { useCreateReviewMutation } from "../../redux/api/productsApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";


const ReviewModal = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [createReview] = useCreateReviewMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onCancelModal = () => {
    setIsModalOpen(false);
  };

  const OnFinish = async (values) => {
    const reviewData = {
      id: id,
      name: values.name,
      email: values.email,
      comment: values.comment,
      rating: Number(values.review),
    };

    const { data } = await createReview(reviewData);
    console.log(data);

    if (data?.success) {
      setIsModalOpen(false);
      form.resetFields();
      return toast.success(data.message, {
        position: "top-center",
        duration: 2000,
        id: 1,
      });
    }
  };

  return (
    <>
      <Button type="default" onClick={showModal} className="p-5">
        Submit Review
      </Button>
      <Modal
        title="Review Modal"
        open={isModalOpen}
        onCancel={onCancelModal}
        footer={null}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={OnFinish}
        >
          <Form.Item
            name="review"
            label="Select Review"
            required
            rules={[{ required: true, message: "Please input your review!" }]}
          >
            <Rate
              allowHalf
              allowClear
              count={5}
              style={{ fontSize: 22 }}
              value={5}
              tooltips={["1", "2", "3", "4", "5"]}
              onChange={(event) => dispatch(setRating(event))}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            required
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            required
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
            required
            rules={[{ required: true, message: "Please input your comment!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 10 }}>
            <Button type="primary" htmlType="submit" className="p-5">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReviewModal;
