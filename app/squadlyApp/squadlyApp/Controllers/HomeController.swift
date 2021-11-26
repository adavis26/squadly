//
//  HomeController.swift
//  squadlyApp
//
//  Created by Adam Davis on 8/29/19.
//  Copyright © 2019 Adam Davis. All rights reserved.
//

import UIKit

class HomeController: UIViewController {
    @IBOutlet weak var scrollViewContainer: UIScrollView!
    @IBOutlet weak var cardViewContainer: UIStackView!
    @IBOutlet weak var squadScrollView: UIScrollView!
    @IBOutlet weak var squadView: UIStackView!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        // Do any additional setup after loading the view.
    }
    

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        let _chat = ChatService()
        let chats = _chat.getSquads()
        
        self.builderUI(chats: chats)
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    func builderUI(chats: [Squad]){
        
        
        self.chatBuilderUI(chats: chats)
        self.squadBuilderUI(squads: chats)
        
        
//        scrollViewContainer.contentSize = CGSize(width: screenWidth, height: CGFloat(count))
    }
    
    func chatBuilderUI(chats: [Squad]) {
        let screenSize = UIScreen.main.bounds
        let screenWidth = screenSize.width
//        let screenHeight = screenSize.height

        var count = 0
        
            for chat in chats {
                
                let cardView = UIView(frame: CGRect(x: 0, y: 0, width:screenWidth, height: 400))
                
                cardView.translatesAutoresizingMaskIntoConstraints = false
                
                let title = UILabel(frame: CGRect(x: 0, y: 0, width: 300, height: 50))
                let description = UILabel(frame: CGRect(x: 0, y: 0, width: 300, height: 50))
                
                title.center = CGPoint(x: 170, y: 20)
                description.center = CGPoint(x: 170, y: 50)
                title.textColor = UIColor(red:1, green:1, blue:1, alpha: 1.0)
                description.textColor = UIColor(red:1, green:1, blue:1, alpha: 1.0)
                
                title.text = chat.squadName
                description.text = chat.squadDescription
                title.font = title.font.withSize(32)
                
                let circlePath = UIBezierPath(arcCenter: CGPoint(x: 350, y: 40), radius: CGFloat(20), startAngle: CGFloat(0), endAngle: CGFloat(Double.pi * 2), clockwise: true)
                let countLabel = UILabel(frame: CGRect(x: 345, y: 20, width:100, height: 40))
                countLabel.text = "3"
                countLabel.textColor =  UIColor(red:0.029, green:0.84, blue:0.627, alpha: 1.0)
                
                let shapeLayer = CAShapeLayer()
                shapeLayer.path = circlePath.cgPath

                
                shapeLayer.fillColor = UIColor.white.cgColor
                shapeLayer.lineWidth = 3.0


                
//                cardView.frame = CGRect(x: 0, y: 0, width: Int(screenWidth)-20, height: 100)
                switch chat.squadType {
                case 1:
                    cardView.backgroundColor = UIColor(red:0.029, green:0.84, blue:0.627, alpha: 1.0)
                case 2:
                    cardView.backgroundColor = UIColor(red:0.176, green:0.665, blue:0.973, alpha: 1.0)
                default:
                    cardView.backgroundColor = UIColor(red:0.684, green:0.684, blue:0.684, alpha: 1.0)
                    
                }
        

                cardView.layer.addSublayer(shapeLayer)
                
                cardView.addSubview(countLabel)
                cardView.addSubview(title)
                cardView.addSubview(description)
                cardView.layer.cornerRadius = 10;
                
                self.cardViewContainer.addArrangedSubview(cardView)

            }
    }
    
    func squadBuilderUI(squads: [Squad]){
        squadView.translatesAutoresizingMaskIntoConstraints = false
        
        for _ in 1...5{
            let squadCardView = UIView(frame: CGRect(x: 0, y: 0, width: 300, height: self.squadScrollView.frame.height))
             
            
            let squadTitle = UILabel(frame: CGRect(x: 0, y: 0, width: 30, height: 50))
            squadTitle.text = "hello"
            
            squadCardView.addSubview(squadTitle)
            squadCardView.backgroundColor = UIColor.darkGray
            self.squadView.addArrangedSubview(squadCardView)
            
        }
        
        
    }

}

extension UIScrollView {
    func updateContentView() {
        contentSize.height = subviews.sorted(by: { $0.frame.maxY < $1.frame.maxY }).last?.frame.maxY ?? contentSize.height
    }
}
