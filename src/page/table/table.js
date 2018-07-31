import React, { Component } from 'react';
import { Table, Input, Form ,Button ,Modal,Tooltip, DatePicker,Icon, Select, Row, Col, Checkbox, AutoComplete,message} from 'antd';
import moment from 'moment';
import { Object } from 'core-js';
import axios from 'axios';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
       disabled: record.name === 'Disabled User', // Column configuration not to be checked
       name: record.name,
    }),
 }
 
export default class TableList extends Component {
    constructor(props) { 
        super(props); //
        this.state = { 
            tableData:[],
            editData: '' 
        };
        this.getTbaleData = this.getTbaleData.bind(this)
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                editable: true,
            },
            {
                title: '性别',
                render(text , record){
                    let sex = ``;
                    if(record.text=="1") sex = `男` 
                    if(record.text=="2") sex = `女` 
                    return sex;
                },
                editable: true,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                editable: true,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: '40%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            <a href="javascript:void(0);" style={{ marginRight: 10 }} 
                            onClick={() => this.editFun(record)}>编辑</a>
                            <a href="javascript:void(0);" style={{ marginRight: 10 }}
                            onClick={() => this.deleteFun(record)}>删除</a>   
                        </div>
                    );
                },
            },
        ];
    }
    // 获取表格数据
    getTbaleData(paramsData) {
        var params = Object.assign({}, paramsData)
        axios.post('http://192.168.0.102:5200/getTableData', params).then((res) => {
            console.log(res.data);
            // let { userInfo } = res.data
            this.setState({ tableData: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }
    isEditing = (record) => {
        return record.key === this.state.editData;
    };

    editFun(record) {
        this.setState({ editData: record });
        this.refs.editModal.showModal();
    }

   // 删除
	deleteFun(key){
		const _this = this
		Modal.confirm({
			title: '删除',
			content: '是否确认删除该项',
			okText: '确认',
			cancelText: '取消',
			onOk(){
				let { userId } = key
				var params = Object.assign({}, { userId })
				axios.post('http://192.168.0.102:5200/deleteUserInfo', params).then((res) => {
                    // 调Home方法 更新数据
                    _this.props.getTbaleData()
                }).catch((err) => {
                    console.log(err)
                })
			}
		})		
	}
    render() {
        let { editData } = this.state
        return (
            <div>
                123321
                <Table
                    bordered
                    dataSource = { this.state.tableData }
                    rowSelection = {rowSelection}
                    columns = {this.columns}
                    rowClassName = "editable-row"
                />
                <EditModal ref="editModal" editData={ editData } 
					getTbaleData={this.props.getTbaleData} />
            </div>
        );
    }
    componentDidMount(){
        this.getTbaleData()
    }
}

class EditModal extends Component {
    constructor(){
		super();
		this.state = {
			isShow: false
		}
	}
    showModal = () => {
        this.setState({
            isShow: true,
        });
    }
    handleOk = (e) =>{
        const { userId } = this.props
		// 调用 弹窗表单组ModalFormGroup 的submitFun方法
		this.formRef.submitFun(e, () => {
            this.setState({ isShow: false })
			this.props.getTbaleData()
		})
    }
    hideModal = () => {
		this.setState({
            isShow: false 
        })
	}
    render() {
		let { editData } = this.props
         return (
            <div>
                <Modal
                    title="编辑"
                    visible={this.state.isShow}
                    onOk={this.handleOk}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                <ModalForm ref="modalForm" editData={editData} 
					wrappedComponentRef={(inst) => this.formRef = inst} />
                </Modal>
            </div>
        );
    }
}

class ModalFormGroup extends Component {
   // 提交
	submitFun(e, callback){
        e.preventDefault()
		let paramsData = this.props.form.getFieldsValue()
		// 格式化时间
		paramsData.userBirth = paramsData.userBirth.format("YYYY-MM-DD")

		let editData  = this.props.editData
		editData? this.aditFun(paramsData, callback): this.addFun(paramsData, callback)

	}

	// 编辑
	aditFun(paramsData, callback){
        var params = Object.assign(this.props.editData, paramsData);
		axios.post('http://192.168.0.102:5200/updateUserInfo', params).then((res) => {
            alert(res)
			message.success('修改成功！！！')
         if(callback && typeof callback === 'function' ) callback()
      }).catch((err) => {
			console.log(err)
			message.error('修改失败！！！')
		})
	}

	// 新增
	addFun(paramsData, callback){
		var params = Object.assign({}, paramsData)
		axios.post('http://192.168.0.102:5200/addUserInfo', params).then((res) => {
			message.success('新增成功！！！')
         if(callback && typeof callback === 'function' ) callback()
      }).catch((err) => {
			console.log(err)
		})
	}

    render() {
        const { getFieldDecorator } = this.props.form
        let editData = this.props.editData
		if(editData) var { name, text, age, userBirth, address } = editData

		let formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 12 },
		}
        return (
        <Form onSubmit={this.handleSubmit}>
            <FormItem
            {...formItemLayout}
            label="姓名"
            >
            {getFieldDecorator('name', {
                initialValue: name || ``,
                rules: [{
                    required: true ,message: '姓名不可为空'
                }],
            })(
                <Input placeholder="请输入用户名" />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="性别"
            >
            {getFieldDecorator('text', {
                initialValue: ( text == '1'? '男': text == '2'? '女': '' ),
                rules: [{
                    required: true 
                }],
            })(
                <Select onChange={this.handleSex}>
                    <Option value="1">男</Option>
                    <Option value="2">女</Option>
                </Select>
            )}
            </FormItem>
            <FormItem label="年龄"{...formItemLayout}>
                {getFieldDecorator('age', {
                    initialValue: age || 0,
                    rules: [{
                        required: true ,
                        pattern: /^\+?[1-9][0-9]*$/, message: '请输入数值！', trigger: 'onBlur'
                    }],
            })(
                <Input placeholder="请输入年龄" />
            )}
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
                {getFieldDecorator('userBirth', {
                    initialValue: ( userBirth? moment(`${userBirth}`) : moment() ),
                    rules: [{
                        required: true 
                    }],
                })(
                <DatePicker format="YYYY-MM-DD" onChange={this.handleDate} />
            )}
            </FormItem>
            <FormItem label="地址" {...formItemLayout}>
                {getFieldDecorator('address', {
                    initialValue: address || ``,
                    rules: [{
                        required: true 
                    }],
                })(
                <Input placeholder="请输入地址"/>
            )}
        	</FormItem>
        </Form>
        );
    }
}
const ModalForm = Form.create()(ModalFormGroup)