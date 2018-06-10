import React from 'react';
import CommonDAO from '@/component/commonDAO';
import {Table, Button, Modal, Popconfirm, message} from 'antd';

const buttonStyle = {
  marginRight: '8px'
}

const rowSelection = {
  fixed: true,
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name
  })
};

export default class Grid extends React.Component {

  static defaultProps = {
    isSearch: true,
    isAdd: true,
    isDelete: true,
    isUpdate: true,
    autoload: true
  }

  state = {
    isAllowSearch: true,
    isAllowAdd: true,
    isAllowDelete: true,
    isAllowUpdate: true,
    data: [],
    isSearchPanelVisible: false,
    isAddPanelVisible: false,
    isUpdatePanelVisible: false,
    loading: false,
    selectedRecord: null,
    selectedRowKeys: [],
  }

  render() {

    const {DAO, primaryKey, autoload, columns} = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (<CommonDAO ref='dao' DAO={DAO} primaryKey={primaryKey} >
      <div>
        {
          this.state.isAllowSearch && this.props.isSearch
            ? <Button type="primary" style={buttonStyle} icon="search" onClick={this.onSearchClick}>
                查询
              </Button>
            : null
        }
        {
          this.state.isAllowSearch && this.props.isSearch
            ? this.renderSearchPanel()
            : null
        }
        {
          this.state.isAllowAdd && this.props.isAdd
            ? <Button type="primary" ghost="ghost" style={buttonStyle} onClick={this.onAddClick} icon="plus">新增</Button>
            : null
        }
        {
          this.state.isAllowAdd && this.props.isAdd
            ? this.renderAddPanel()
            : null
        }
        {
          this.state.isAllowDelete && this.props.isDelete
            ? <Popconfirm title="确认删除选中的数据?" placement="right" okText="删除" onConfirm={this.onDeleteClick} cancelText="取消">
                <Button type="danger" ghost="ghost" style={buttonStyle} icon="close">删除</Button>
              </Popconfirm>
            : null
        }
        {
          this.state.isAllowUpdate && this.props.isUpdate
            ? this.renderUpdatePanel()
            : null
        }
        <Button type="default" style={buttonStyle} icon="reload" onClick={this.onRefreshClick}>
          刷新
        </Button>
      </div>,
      <Table loading={this.state.loading} rowKey={primaryKey} bordered={true} rowSelection={rowSelection} dataSource={this.state.data} columns={columns} onRowDoubleClick={this.onRowDoubleClick}></Table>
    </CommonDAO>)

  }

  componentDidMount() {
    this.reload();
  }

  //刷新所有数据
  reload = function() {
    const me = this;
    me.setState({loading: true});
    this.refs.dao.get(null, (data) => {
      me.setState({data: data.data, loading: false})
    }, (error) => {
      me.setState({loading: false});
      message.error("加载失败");
    })
  }.bind(this)

  //搜索按钮
  onSearchClick = function(event) {
    this.setState({isSearchPanelVisible: true});
  }.bind(this)

  onRefreshClick = function(event) {
    this.reload();
  }.bind(this)

  onSelectChange = function(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }.bind(this)

  handleSearchSubmit = function() {
    let form = this.refs.searchForm;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let values = form.getFieldsValue();
      this.setState({loading: true});
      this.refs.dao.get(values, (data) => {
        this.setState({data: data.data, isSearchPanelVisible: false, loading: false})
      }, (error) => {
        message.error("查询失败");
        this.setState({isSearchPanelVisible: false, loading: false})
      })
    });

  }.bind(this)

  renderSearchPanel = function() {
    return (<Modal title="查询" visible={this.state.isSearchPanelVisible} onOk={this.handleSearchSubmit
} onCancel={() => {
        this.setState({isSearchPanelVisible: false})
      }} cancelText="取消" okText="搜索" mask={false}>
      {this.renderSearchForm()}
    </Modal>)
  }.bind(this)

  //渲染查询框 子类需重写 ref="searchForm"
  renderSearchForm = function() {}.bind(this)

  //增加按钮
  onAddClick = function(event) {
    this.setState({isAddPanelVisible: true})
  }.bind(this)

  renderAddPanel = function() {
    return (<Modal title="新增" width="70vw" visible={this.state.isAddPanelVisible} onOk={this.handleAdd} onCancel={() => {
        this.setState({isAddPanelVisible: false})
      }} destroyOnClose={true} cancelText="取消" okText="保存">
      {this.renderAddForm()}
    </Modal>)
  }.bind(this)

  //子类需重写渲染更新表单 ref="addForm"
  renderAddForm = function() {}.bind(this)
  //删除按钮
  onDeleteClick = function(event) {
    let {selectedRowKeys} = this.state;
    const me = this;
    if(!selectedRowKeys){
      message.error("请选择至少一条记录");
      return;
    }
    me.refs.dao.delete(selectedRowKeys.join('-'), (data) => {
      message.success('删除成功');
      me.reload();
    }, (error) => {
      message.error('删除失败');
    })
  }.bind(this)

  //更新操作
  onRowDoubleClick = function(record) {

    const {primaryKey} = this.props;
    let params = {};
    params[primaryKey] = record[primaryKey];
    this.refs.dao.get(params, (data) => {
      this.setState({isUpdatePanelVisible: true, selectedRecord: data.data[0]})
    })
  }.bind(this)

  //子类需重写渲染更新表单 ref="updateForm"
  renderUpdateForm = function() {}.bind(this)

  renderUpdatePanel = function() {
    return (<Modal width='70vw' title="更新" visible={this.state.isUpdatePanelVisible} onOk={this.handleUpdate} onCancel={() => {
        this.setState({isUpdatePanelVisible: false});
      }} cancelText="取消" okText="保存" destroyOnClose={true}>
      {this.renderUpdateForm()}
    </Modal>)
  }.bind(this)

  handleAdd = function() {
    const me = this;
    let form = this.refs.addForm;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let values = form.getFieldsValue();
      me.refs.dao.post(values, (data) => {
        me.setState({isAddPanelVisible: false});
        message.success('保存成功');
        me.reload();
      }, (error) => {
        message.error('保存失败');
      })
    });
  }.bind(this)

  handleUpdate = function() {
    const me = this;
    const {primaryKey} = this.props;
    let form = this.refs.updateForm;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let values = form.getFieldsValue();
      me.refs.dao.put(values[primaryKey], values, (data) => {
        me.setState({isUpdatePanelVisible: false});
        message.success('保存成功');
        me.reload();
      }, (error) => {
        message.error('保存失败');
      })
    });
  }.bind(this)
}
