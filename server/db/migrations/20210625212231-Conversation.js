'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'Conversation',
        'user1lastRead',
        Sequelize.INTEGER
      ),
      queryInterface.addColumn(
      'Conversation',
      'user2lastRead',
      Sequelize.INTEGER
      ),
      queryInterface.addColumn(
        'Conversation',
        'user1unread',
        Sequelize.INTEGER
      ),
      queryInterface.addColumn(
        'Conversation',
        'user2unread',
        Sequelize.INTEGER
      )
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn(
        'Conversation',
        'user1lastRead'
      ),
      queryInterface.removeColumn(
      'Conversation',
      'user2lastRead'
      ),
      queryInterface.removeColumn(
        'Conversation',
        'user1unread'
      ),
      queryInterface.removeColumn(
        'Conversation',
        'user2unread'
      )
    ]
  }
};
