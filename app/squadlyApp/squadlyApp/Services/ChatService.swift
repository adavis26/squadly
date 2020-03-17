//
//  ChatService.swift
//  squadlyApp
//
//  Created by Adam Davis on 9/29/19.
//  Copyright © 2019 Adam Davis. All rights reserved.
//

import Foundation

class ChatService {
    public func getSquads() -> [Squad]{
        
        var squads = [Squad]()
        
        squads.append(Squad(squadId:  1, squadName: "Homies", squadDescription: "A group for sports", squadType: 1, chats: [1, 3, 5]))
        squads.append(Squad(squadId:  2, squadName: "Pals", squadDescription: "A group for movies", squadType: 2, chats: [2, 4]))
        
        return squads
        }
    
        public func getChats() -> [Chat]{
        
        var chats = [Chat]()
            
            for n in 1...5 {
                chats.append(Chat(chatId: n, chatTitle: "test chat \(n)", members: [] ))
            }
        
        return chats
        }
    }
